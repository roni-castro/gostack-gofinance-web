import styled from 'styled-components';

const TR = styled.tr`
  td {
    padding: 20px 32px;
    border: 0;
    background: #fff;
    font-size: 16px;
    font-weight: normal;
    color: #969cb3;

    &.title {
      color: #363f5f;
    }

    &.income {
      color: #12a454;
    }

    &.outcome {
      color: #e83f5b;
    }
  }

  td:first-child {
    border-radius: 8px 0 0 8px;
  }

  td:last-child {
    border-radius: 0 8px 8px 0;
  }
`;

export default TR;
