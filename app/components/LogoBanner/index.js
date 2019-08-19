import React, { Component } from 'react';
import StyledComponent from './styled/styled';
import logo1 from '../../images/brand-logo/Bitmap.png';
import logo2 from '../../images/brand-logo/Bitmap2.png';
import logo3 from '../../images/brand-logo/Bitmap3.png';
import logo4 from '../../images/brand-logo/Bitmap4.png';
import logo5 from '../../images/brand-logo/Bitmap5.png';
import logo6 from '../../images/brand-logo/Bitmap6.png';
import PropTypes from 'prop-types';
import Slider from "react-slick";


export default class LogoBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logos: [
        {
          id: 4,
          title: 'Piaggio',
          url: logo5,
          left: 78,
          right: 20,
          alt: 'piaggio',
        },
        {
          id: 1,
          title: 'Honda',
          url: logo4,
          left: 40,
          right: 58,
          alt: 'honda',
        },
        {
          id: 2,
          title: 'Yamaha',
          url: logo6,
          left: 95,
          right: 3,
          alt: 'yamaha',
        },
        {
          id: 5,
          title: 'SYM',
          url: logo3,
          left: 40,
          right: 58,
          alt: 'sym',
        },
        {
          id: 3,
          title: 'Suzuki',
          url: logo2,
          left: 21,
          right: 76,
          alt: 'suzuki',
        },
        {
          id: 9,
          title: 'BMW',
          url: logo1,
          left: 3,
          right: 95,
          alt: 'bmw',
        },
      ],
      activeLogo: {},
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(logo) {
    this.setState({
      activeLogo: {
        ...logo,
      },
    });
    if (this.props.handleBrandSelected) {
      this.props.handleBrandSelected(logo.id);
    }
  }

  render() {
    var settings = {
      dots: false,
      arrows:false, 
       slidesToShow: 5,
      slidesToScroll: 3,
      swipe:false,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            autoplay:true,
            swipe:true,
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
          }
        },
      ]
    }
    return (
      <StyledComponent>
        {/* {this.state.logos.map((logo) => (<Card*/}
        {/* key={logo.id}*/}
        {/* >*/}
        {/* <CardImg*/}
        {/* className={this.state.activeLogo.id === logo.id ? 'active' : ''}*/}
        {/* top*/}
        {/* width="10%"*/}
        {/* src={`${logo.url}`}*/}
        {/* onClick={() => this.handleClick(logo)}*/}
        {/* />*/}
        {/* </Card>))}*/}
        <Slider {...settings}>
          {this.state.logos.map((logo) => (
            <a
              role={'button'}
              
              onClick={() => this.handleClick(logo)}
              tabIndex={0}
              key={logo.id}
            >
              <img
                src={logo.url}
                className={this.state.activeLogo.id === logo.id ? 'active' : ''}
                alt={logo.alt}
              />
            </a>
          ))}
        </Slider>
      </StyledComponent>
    );
  }
}

LogoBanner.propTypes = {
  handleBrandSelected: PropTypes.func,
};
