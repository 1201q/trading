import styled from "styled-components";

const Test = () => {
  return (
    <Center>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT> <ListContainer>111111111111</ListContainer>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT> <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT> <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT> <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT> <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT> <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT> <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT> <TT>11111111111111</TT>
      <TT>11111111111111</TT>
      <TT>11111111111111</TT>
    </Center>
  );
};
const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.div`
  margin: 0px 0px;
  padding: 10px 15px 15px 15px;
  border-radius: 10px;
  background-color: beige;
  border: 1px solid #eeeeee;
  max-width: 420px;
  height: 30px;
  position: sticky;
  top: 0;
`;

const TT = styled.div`
  height: 50px;
  background-color: red;
  margin-bottom: 5px;
`;

export default Test;
