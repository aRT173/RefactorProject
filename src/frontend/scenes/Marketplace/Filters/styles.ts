import styled from "styled-components";
import {Input} from "antd";

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  gap: 40px;
`;

export const Search = styled(Input)`
    display: block;
    width: 30%;
    margin: 32px auto;
`