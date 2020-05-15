import styled from 'styled-components'

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
  justify-content: space-around;
  margin-top: 60px;

  input[type='checkbox'] {
    margin-right: 10px;
  }

  input[type='text'] {
    background-color: transparent;
    font-size: 14px;
    border: none;
    border-bottom: solid 1px #ccc;
  }

  label {
    font-size: 12px;
  }
`
