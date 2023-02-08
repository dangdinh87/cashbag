import React, { CSSProperties } from 'react';
import { Carousel, CarouselProps } from 'react-bootstrap';

interface Props {
  content: any[];
  style?: CSSProperties;
  className?: string;
  contentClass?: string;
  showControl?: boolean;
  carouselProps?: CarouselProps;
}
const AppCarousel: React.FC<Props> = ({
  content = [],
  style,
  className = '',
  contentClass = '',
  showControl = true,
  carouselProps,
}) => {
  return (
    <Carousel
      {...carouselProps}
      className={className}
      style={style}
      controls={showControl && content?.length > 1}
      indicators={showControl && content?.length > 1}
    >
      {content.map((item: any, index) => (
        <Carousel.Item key={index}>{item}</Carousel.Item>
      ))}
    </Carousel>
  );
};
export default AppCarousel;
