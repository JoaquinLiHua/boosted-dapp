import React from 'react';
import styled from 'styled-components';
import { PrimaryButton } from 'styles/common';

export const Button = (props) => {
	const { children, ...rest } = props;
	return <ButtonStyle {...rest}>{children}</ButtonStyle>;
};
