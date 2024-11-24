import { Avatar, Box, Skeleton, SxProps, Typography, useTheme } from "@mui/material";
import { User, UserShortInfo } from "../app/types";
import MyLabel from "./UI/MyLabel";

type Props = {
  user: UserShortInfo | undefined;
  hideEmail?: boolean;
  sx?: SxProps;
  avatarSize?: number;
  centered?: boolean;
  reversed?: boolean;
};

const UserInfo = ({ user, reversed = false, hideEmail = false, sx, avatarSize = 60, centered = false }: Props) => {
  const theme = useTheme();
  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          flexDirection: reversed ? "row-reverse" : "row",
          columnGap: 1,
          rowGap: 0.5,
          alignItems: centered ? "center" : "flex-end",
          maxWidth: "100%",
        }}
      >
        <Avatar
          sx={{
            border: `${avatarSize / 20}px solid ${
              theme.palette.mode === "dark" ? "white" : theme.palette.primary.main
            }`,
            width: avatarSize,
            height: avatarSize,
          }}
          alt={user?.name}
          src={user?.avatarUrl || ""}
        />
        <Box sx={{ mr: "auto" }}>
          {user?.name ? (
            <Typography
              sx={{ wordWrap: "break-word", maxWidth: "100%", fontWeight: 700, fontSize: { xs: 20, md: 24 } }}
              component="h3"
            >
              {user?.name}
            </Typography>
          ) : (
            <Skeleton sx={{ width: 150, height: { xs: 30, md: 36 } }} animation="wave" />
          )}
        </Box>
        {!hideEmail && (
          <Box>
            {user?.email ? (
              <Typography
                sx={{ overflowWrap: "break-word", maxWidth: "100%", fontSize: { xs: 18, md: 22 } }}
                component="h3"
              >
                {user?.email}
              </Typography>
            ) : (
              <Skeleton sx={{ width: 150, height: { xs: 30, md: 36 } }} animation="wave" />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserInfo;
