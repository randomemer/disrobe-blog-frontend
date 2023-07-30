import SettingsLayout from "@/components/layout/settings";
import useAuth from "@/hooks/use-auth";
import { useSnackbar } from "material-ui-snackbar-provider";
import {
  AvatarEditButton,
  AvatarFileInput,
  ProfileContent,
  ProfileForm,
  ProfileFormButton,
  UserAvatar,
} from "@/styles/settings-profile.styles";
import { SectionHeading, SettingsSection } from "@/styles/settings.styles";
import { InputField } from "@/styles/shared";
import { AsyncStatus, FormErrors } from "@/types";
import {
  getMediaURL,
  isBlobURL,
  objectDifference,
  validateSchemaField,
} from "@/modules/utils";
import {
  DescriptionOutlined,
  EditSharp,
  MailOutlineSharp,
  SaveSharp,
} from "@mui/icons-material";
import { Badge, InputAdornment, Skeleton } from "@mui/material";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";
import { object, ObjectSchema, reach, string } from "yup";
import _ from "lodash";
import path from "path-browserify";
import clientMediaRepo from "@/modules/backend/repos/media";
import { v4 } from "uuid";
import withAuth from "@/components/auth/hoc";
import axios from "axios";
import { getAuth } from "firebase/auth";

// ============================================================

interface ProfileFormValues {
  name: string;
  bio: string | null;
  picture?: string | null;
}

interface ProfileForm {
  values: ProfileFormValues;
  errors: FormErrors<ProfileFormValues>;
}

const profileSchema: ObjectSchema<ProfileFormValues> = object({
  name: string()
    .trim()
    .test(
      "empty-test",
      "Your name can't be empty",
      (name) => !!name && !!name.trim()
    )
    .required(),
  bio: string().trim().nullable().default(null),
  picture: string().nullable().default(null),
});

// ============================================================

function SettingsProfileRoute() {
  const [auth, setAuth] = useAuth();
  const author = auth.author;
  const snackbar = useSnackbar();

  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [{ values, errors }, setForm] = useImmer<ProfileForm>({
    values: {
      name: author?.name ?? "",
      bio: author?.bio ?? "",
      picture: author?.picture ?? "",
    },
    errors: {},
  });

  const imageURL =
    values.picture &&
    (isBlobURL(values.picture) ? values.picture : getMediaURL(values.picture));

  useEffect(() => {
    if (!author) return;
    setChanged(
      !_.isEqual(
        profileSchema.cast(values),
        profileSchema.cast(author, { stripUnknown: true })
      )
    );
  }, [values, author]);

  useEffect(() => {
    if (author) {
      setForm((form) => {
        form.values = {
          name: author.name,
          picture: author.picture,
          bio: author.bio,
        };
      });
    }
  }, [author, setForm]);

  /**
  |--------------------------------------------------
  |             Callbacks
  |--------------------------------------------------
  */

  const onAvatarEdit = () => {
    fileInputRef.current?.click();
  };

  const onAvatarChange: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (!event.target.files) return;
    const [file] = event.target.files;

    if (values.picture && isBlobURL(values.picture)) {
      URL.revokeObjectURL(values.picture);
    }

    setForm((form) => {
      form.values.picture = URL.createObjectURL(file);
    });
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name as keyof ProfileFormValues;
    const value: ProfileFormValues[keyof ProfileFormValues] =
      event.target.value;

    setForm((form) => {
      form.values[name] = value;

      const field = reach(profileSchema, name) as any;
      form.errors[name] = validateSchemaField(field, name);
    });
  };

  const onSubmitProfile = async () => {
    setLoading(true);
    try {
      const data = profileSchema.cast(values);
      const original = profileSchema.cast(author, { stripUnknown: true });
      const diff = objectDifference(data, original);

      // upload image, only if the current url is from local (blob url)
      if (diff.picture && fileInputRef.current?.files) {
        const [file] = fileInputRef.current.files;
        const ext = path.extname(file.name);
        const bucketPath = `images/authors/${author!.id}/${v4()}${ext}`;
        await clientMediaRepo.upload(bucketPath, file);
        diff.picture = bucketPath;
      }

      const token = await getAuth().currentUser!.getIdToken();
      const resp = await axios.put("/api/me", diff, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = resp.data;

      setAuth((auth) => {
        auth.author = updated;
      });
      setForm((form) => {
        form.values = updated;
      });
      fileInputRef.current!.value = "";
    } catch (error) {
      snackbar.showMessage((error as Error).message, "OK", () => {}, {
        severity: "error",
      } as any);
    }
    setLoading(false);
  };

  switch (auth.status.author) {
    case AsyncStatus.FULFILLED: {
      return (
        <SettingsLayout>
          <SettingsSection>
            <SectionHeading variant="h4" component="h1">
              Profile
            </SectionHeading>
            <ProfileContent>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <AvatarEditButton variant="contained" onClick={onAvatarEdit}>
                    <EditSharp />
                    <AvatarFileInput
                      hidden
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={onAvatarChange}
                    />
                  </AvatarEditButton>
                }
              >
                <UserAvatar alt={author!.name} src={imageURL || undefined} />
              </Badge>
              <ProfileForm>
                <InputField
                  name="name"
                  value={values.name}
                  error={!!errors.name}
                  helperText={errors.name}
                  onChange={onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineSharp />
                      </InputAdornment>
                    ),
                  }}
                />

                <InputField
                  name="bio"
                  value={values.bio ?? ""}
                  error={!!errors.bio}
                  helperText={errors.bio}
                  onChange={onChange}
                  multiline
                  minRows={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionOutlined />
                      </InputAdornment>
                    ),
                  }}
                />

                <ProfileFormButton
                  loading={loading}
                  type="submit"
                  variant="outlined"
                  startIcon={<SaveSharp />}
                  disabled={!changed}
                  onClick={onSubmitProfile}
                >
                  Save
                </ProfileFormButton>
              </ProfileForm>
            </ProfileContent>
          </SettingsSection>
        </SettingsLayout>
      );
    }

    case AsyncStatus.PENDING: {
      return <SettingsProfileSkeleton />;
    }

    default: {
      return <></>;
    }
  }
}

function SettingsProfileSkeleton() {
  return (
    <SettingsLayout>
      <SettingsSection>
        <SectionHeading variant="h4" component="h1">
          Profile
        </SectionHeading>
        <ProfileContent>
          <Skeleton variant="circular" width="15rem" height="15rem" />
          <ProfileForm>
            <Skeleton variant="text" sx={{ fontSize: "2.4rem" }} />
            <Skeleton variant="rectangular" height="6.4rem" />
          </ProfileForm>
        </ProfileContent>
      </SettingsSection>
    </SettingsLayout>
  );
}

export default withAuth({
  whenAuthed: SettingsProfileRoute,
  beforeAuth: SettingsProfileSkeleton,
});
