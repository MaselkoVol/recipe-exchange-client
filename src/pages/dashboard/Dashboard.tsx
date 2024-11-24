import { useGetCurrentUserQuery } from "../../app/services/currentApi";
import { Box, Container, Grid, MenuItem, Select, Stack, useTheme } from "@mui/material";
import UserControl from "./UserControl";
import { Outlet } from "react-router-dom";
import ActionList from "./ActionList";
import ActionSelect from "./ActionSelect";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: user, error, isLoading } = useGetCurrentUserQuery();
  return (
    <Container sx={{ py: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={3} sx={{ display: { xs: "none", xl: "block" } }}>
          <Box sx={{ position: "sticky", top: 87 }}>
            <ActionList user={user} />
          </Box>
        </Grid>
        <Grid item sx={{ order: { xs: 2, sm: 1 } }} xs={12} sm={7} xl={6}>
          <ActionSelect user={user} sx={{ mb: 2, display: { xs: "block", sm: "none" } }} />
          <Outlet />
        </Grid>
        <Grid item sx={{ order: { xs: 1, sm: 2 } }} xs={12} sm={5} xl={3}>
          <Box
            sx={{
              display: { xs: "flex", sm: "block" },
              position: { xs: "static", sm: "sticky" },
              top: 87,
            }}
          >
            <Stack spacing={4} sx={{ width: "100%", maxWidth: { xs: "100%", sm: 350, xl: "100%" } }}>
              <UserControl user={user} />
              <ActionList sx={{ display: { xs: "none", sm: "grid", xl: "none" } }} user={user} />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
