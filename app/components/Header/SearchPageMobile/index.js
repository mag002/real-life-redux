import React from 'react';
import StyledSearchPageMobile from './styled/StyledSearchPageMobile'

import { forwardTo } from '../../../utils/history';
import SearchBar from 'containers/SearchBar'
export default class SearchPageMobile extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            filterData:null
        }
      }
      render(){
          return (
            <StyledSearchPageMobile className={this.props.className}>
                <SearchBar
                    redirect={this.props.redirect}
                    header
                    show={this.props.show}
                    overrideSearch={() => {
                    forwardTo('/search');
                    }}
                    filterData={this.state.filterData}
                />
            </StyledSearchPageMobile>
        );
      }
}
