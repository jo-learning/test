import React from 'react';
import Slider from 'react-slick';
/* Import slick-carousel's CSS */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderImages = [
  { id: 1, url: 'https://via.placeholder.com/800x400', caption: 'Welcome to Zos' },
  { id: 2, url: 'https://via.placeholder.com/800x400', caption: 'Best Deals Here' },
  { id: 3, url: 'https://via.placeholder.com/800x400', caption: 'Shop the Latest Trends' },
  // Add more images if needed
];

function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto mb-8 mt-3">
      <Slider {...settings}>
        {sliderImages.map(image => (
          <div key={image.id} className="relative">
            <img src={image.url} alt={image.caption} className="w-full h-64 object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
              <h2 className="text-lg font-semibold">{image.caption}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
