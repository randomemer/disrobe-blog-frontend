import withAuth from "@/components/auth/hoc";

function StorySettingsRoute() {
  return <></>;
}

function StorySettingsSkeleton() {
  return <></>;
}

export default withAuth({
  beforeAuth: StorySettingsSkeleton,
  whenAuthed: StorySettingsRoute,
});
