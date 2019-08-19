import styled from 'styled-components';

export default styled.div`
  .pac-container {
    background-color: #fff;
    position: absolute !important;
    z-index: 1000;
    border-radius: 2px;
    border-top: 1px solid #d9d9d9;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    //margin-top: 65px;
  }

  .pac-logo:after {
    padding: 1px 1px 1px 0;
    height: 16px;
    text-align: right;
    display: block;
    background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3.png);
    background-position: right;
    background-repeat: no-repeat;
    background-size: 120px 14px
  }

  .hdpi.pac-logo:after {
    background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/powered-by-google-on-white3_hdpi.png)
  }

  .pac-item {
    cursor: default;
    padding: 0 4px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 30px;
    text-align: left;
    border-top: 1px solid #e6e6e6;
    font-size: 11px;
    color: #999
  }

  .pac-item:hover {
    background-color: #fafafa
  }

  .pac-item-selected,
  .pac-item-selected:hover {
    background-color: #ebf2fe
  }

  .pac-matched {
    font-weight: 700
  }

  .pac-item-query {
    font-size: 13px;
    padding-right: 3px;
    color: #000
  }

  .pac-icon {
    width: 15px;
    height: 20px;
    margin-right: 7px;
    margin-top: 6px;
    display: inline-block;
    vertical-align: top;
    background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/autocomplete-icons.png);
    background-size: 34px
  }

  .hdpi .pac-icon {
    background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/autocomplete-icons_hdpi.png)
  }

  .pac-icon-search {
    background-position: -1px -1px
  }

  .pac-item-selected .pac-icon-search {
    background-position: -18px -1px
  }

  .pac-icon-marker {
    background-position: -1px -161px
  }

  .pac-item-selected .pac-icon-marker {
    background-position: -18px -161px
  }

  .pac-placeholder {
    color: gray
  }
`;
