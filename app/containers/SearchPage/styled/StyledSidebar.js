import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';

export default styled.div`
@media (max-width:${breakpoint.ipX}){
    max-height:0vh;
    overflow:hidden;
    transition:0.3s;
    &.active{
        max-height:1000vh;
        margin-bottom:50px;

    }
}
`
