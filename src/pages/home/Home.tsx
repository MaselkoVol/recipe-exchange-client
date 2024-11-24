import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import ClientLink from "../../components/UI/ClientLink";
import MyCard from "../../components/UI/MyCard";
import { useColors } from "../../hooks/useColors";
import Image from "../../components/UI/Image";
import MyButton from "../../components/UI/MyButton";
import Footer from "../../components/Footer";
import Carousel from "../../components/UI/Carousel";
import { SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Scrollbar } from "swiper/modules";
import { BASE_URL } from "../../utils/constants";

type Props = {};

const Home = (props: Props) => {
  const colors = useColors();
  return (
    <Box sx={{ flex: 1, py: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container>
        <MyCard
          sx={{
            flexDirection: { xs: "column-reverse", md: "row" },
            columnGap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack sx={{ py: { xs: 2, md: 8 }, flex: 1, gap: { xs: 3, md: 2 } }}>
            <ClientLink disableHoverEffect to={"/recipe"}>
              <Typography
                variant="h1"
                component={"h1"}
                sx={{ fontWeight: 700, fontSize: { xs: 36, md: 40 }, textWrap: "pretty" }}
              >
                Find your favorite recipes{" "}
                <span style={{ textDecoration: "underline", color: colors.contrast }}>now!</span>
              </Typography>
            </ClientLink>
            <Typography
              variant="h6"
              component={"h2"}
              sx={{ fontWeight: 500, fontSize: { xs: 16, md: 20 }, textWrap: "pretty" }}
            >
              Our recipe exchange platform lets food lovers from around the world share their tastiest creations, you'll
              find endless inspiration here.
            </Typography>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              <ClientLink to={"/login"}>
                <MyButton size="large" variant="contained">
                  Login
                </MyButton>
              </ClientLink>
              <ClientLink to={"/register"}>
                <MyButton size="large" variant="outlined">
                  Register
                </MyButton>
              </ClientLink>
            </Box>
          </Stack>
          <Image
            sx={{
              display: { xs: "none", sm: "block" },
              flex: 1,
              aspectRatio: "16/9",
              maxWidth: "80%",
              paddingBottom: "30%",
            }}
            src={BASE_URL + "/static/home.png"}
          />
        </MyCard>
      </Container>
    </Box>
  );
};

export default Home;
