import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import '../style.css';

interface Props {
  title: string;
}

const CustomDivider = ({ title }: Props) => {
  return (
    <Flex alignItems="center" justifyContent="center" marginY="1rem">
      <Flex backgroundColor="#000" height="1px" width="100%" marginX="1rem" />
      <Flex backgroundColor="white" paddingX="1px" whiteSpace="nowrap">
        <Text as="p" fontSize="14px" fontWeight="bold">
          {title}
        </Text>
      </Flex>
      <Flex backgroundColor="#000" height="1px" width="100%" marginX="1rem" />
    </Flex>
  );
};

export default CustomDivider;
