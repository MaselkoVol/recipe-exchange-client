import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { styled, SxProps } from "@mui/material";
import { FC } from "react";
import { useColors } from "../../hooks/useColors";

const CustomSwiper = styled(Swiper)(() => {
  const colors = useColors();
  return {
    ".swiper-button-next": {
      color: colors.palette.primary.main,
    },
    ".swiper-button-prev": {
      color: colors.palette.primary.main,
    },
    ".swiper-pagination-bullet-active": {
      backgroundColor: colors.palette.primary.main,
    },
    ".swiper-pagination-bullet": {
      backgroundColor: colors.palette.grey[700],
    },
    "&.swiper": {
      marginLeft: 0, // This applies the CSS to .swiper class
    },
  };
});

type Props = SwiperProps & {
  sx?: SxProps;
};

const Carousel: FC<Props> = ({ sx, children, ...rest }) => {
  return (
    <CustomSwiper sx={sx} {...rest}>
      {children}
    </CustomSwiper>
  );
};

export default Carousel;
