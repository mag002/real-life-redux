import styled, { css } from 'styled-components';
import { imageCenterAlign } from 'styles/commonCss';
import breakpoint from 'styles/breakpoint'

export default styled.div`
  i{
    z-index: 55;
    color: white;
    position: fixed;
    right: 20px;
    top: 20px;
    font-size:20px;
    font-weight:100;
    cursor:pointer;
  }
  .image-gallery-slide-wrapper {
    background-color: white;
    padding: 8.5px;
    box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
    
    .image-gallery-swipe {    
       background-color: #f4f4f4;
    
     
    }
    .image-gallery-image {
      height: 450px;
      background-color: #f4f4f4;
      ${imageCenterAlign}
    }
    .image-gallery-left-nav, .image-gallery-right-nav {
      padding: 0;
      font-size: 35px;
      background-color: #d8d8d8;
      width: 30px;
      height: 50px;
      
      &:focus {
        outline: none;
      }
      
      &:before {
        font-weight:600;
        text-shadow: none;
      }
      
      &:hover:before {
        color: #a59f9f;
      }
    }
  }

  .image-gallery-thumbnails-wrapper {
    .image-gallery-thumbnails {
      padding-top: 30px;
      padding-bottom: 0;
    }
  
    .image-gallery-thumbnail {      
      background-color: white;
      padding: 8px;
      border: 1px solid rgba(16, 22, 26, 0.15);
      transition: 0.3s;
      width: calc(32%);
      
      .image-gallery-thumbnail-inner {
        height: 120px;
        background-color: #f4f4f4;
        ${imageCenterAlign}
      }
      
      & + .image-gallery-thumbnail {
        margin-left: 2%;
      }
      
      &.active {
        transform: translateY(-5px);
        box-shadow: 0 0 15px rgba(0,0,0,0.2);
      }
    }
  }
    
  .fullscreen-modal {
    z-index: 50; 
 
    .image-gallery-content {    
      max-width: 1140px;
      margin: 0 auto;
      
      .image-gallery-slide-wrapper {
        .image-gallery-swipe {    
          .image-gallery-image {
            height: ${window.innerHeight / 1.5}px;
          }
        }
      }
    }
    
    .image-gallery-thumbnails-wrapper {
      .image-gallery-thumbnail {      
        width: calc(19%);
      
        & + .image-gallery-thumbnail {
          margin-left: 1%;
        }
      }
    }
  }
  @media (max-width:${breakpoint.md}){
    .image-gallery-thumbnails .image-gallery-thumbnails-container{
      display:none;
    }
    .image-gallery-slide-wrapper {
      padding: 0;
      box-shadow: none;
      .image-gallery-image {
        height: 200px;
      }
    }
    .image-gallery-thumbnails-wrapper{
      display:none;
    }
  }
`;
