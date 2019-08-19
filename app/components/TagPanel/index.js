import React from 'react';
// import { Container } from 'reactstrap';
import Container from 'reactstrap/es/Container';
import styled from 'styled-components';
import { configuration } from '../../constants';
import PropTypes from 'prop-types';


const StyledComponent = styled.div`      
    background-color: #e2e2e2;
    padding: 30px 0 30px 0;
    overflow:auto;
    .panel {
      display: flex;
      justify-content: space-between;
      width: 100%;  
    }
    .tag {
      font-size: 14px;
      font-weight: 700;
      color: black;
    }
    .bp3-tag {
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      background-color: transparent;
      transition: 0.3s;
    }
    
    a:hover span {
      color: ${(props) => props.theme.primaryColor};
    }
  
`;

const TagPanel = (props) => {
  const tags = configuration.tags;

  return (
    <StyledComponent className={'d-none d-md-block'}>
      <Container>
        <div className="panel">
          <span className="tag">Tag</span>
          {tags.map((tag) => (<a
            key={Math.random()}
            onClick={() => props.handleTagSelected(tag)}
            role="button"
            tabIndex={0}
          ><span className="bp3-tag .modifier" >{tag}</span></a>))}
        </div>
      </Container>
    </StyledComponent>

  );
};

TagPanel.propTypes = {
  handleTagSelected: PropTypes.func,
};

export default TagPanel;
