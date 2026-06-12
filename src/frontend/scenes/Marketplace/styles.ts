import styled from "styled-components";
import { Input as BaseInput } from "antd";
import InfiniteScrollBase from "react-infinite-scroll-component";

export const InfiniteScroll = styled(InfiniteScrollBase)`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

export const Input = styled(BaseInput)`
  width: 200px;
`;

export const CardTitle = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

export const Description = styled.p`
  margin: 30px 0 0;
`;
