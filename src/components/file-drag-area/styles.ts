import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DragArea = styled(Box)`
  position: relative;
  flex: 1;
  font-size: 1.4rem;
  line-height: 1.6;

  input {
    display: none;
  }

  label {
    position: relative;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);

    border: 1px solid rgba(255, 255, 255, 0.15);

    border-radius: 4px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &.dragging {
      background-color: rgba(0, 0, 0, 0.3);
    }

    .MuiSvgIcon-root {
      font-size: 4.8rem;
    }
  }
`;

export const UploadButton = styled("button")`
  text-decoration: underline;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
  display: inline;

  &:hover {
    cursor: pointer;
  }
`;

export const DragOverlay = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 0.5rem;
`;
