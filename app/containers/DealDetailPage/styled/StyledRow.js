import styled from 'styled-components';
import {Row} from 'reactstrap';
import breakpoint from 'styles/breakpoint'
export default styled(Row)`
    
    @media(min-width:${breakpoint.md}){
        .col-md-12:first-child{
            flex: 0 0 55%!important;
            max-width: 55%!important;
            padding-right: 0px!important;
        }
        .col-md-12:nth-child(2){
            flex: 0 0 45%!important;
            max-width: 45%!important;
        }
    }
`;

