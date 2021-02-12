import React, { Component } from 'react';
import styled from 'styled-components';
import Faq from 'react-faq-component';

import { H1, H6, MediumSpacer, SmallSpacer, SearchField, GlowTextLink, PSmallStyles } from 'styles/common';
import { ExternalLink } from 'components/general/ExternalLink';

const VaultFAQs = {
  rows: [
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },],
}

const PoolFAQs = {
  rows: [
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus?",
      content: "Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nulla non metus auctor fringilla. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."
    },],
}

const stylesFAQ = {
  arrowColor: "#56C7F6",
  transitionDuration: "0.1s",
  timingFunc: "ease-out"
};

export const FAQ: React.FC = () => {
	return (
		<>
    <TopRow>
				<H1>FAQs</H1>
					<SearchField type="search" placeholder="Search from FAQs.."></SearchField>
			</TopRow>

      <SmallSpacer />

      <H6>Vaults</H6>
      <Faq
        data={VaultFAQs}
        styles={stylesFAQ}
      />

      <SmallSpacer />

      <H6>Pools</H6>
      <Faq
        data={PoolFAQs}
        styles={stylesFAQ}
      />
      <MediumSpacer />
      <Questions>Have more questions? <DiscordLink href="https://discord.gg/gp9bsaQ">› Join our Discord</DiscordLink></Questions>

    </>
  );
};

const TopRow = styled.div``;

const Questions = styled.p`
  ${PSmallStyles}
  text-align: right;
`;

const DiscordLink = styled(ExternalLink)`
  ${PSmallStyles}
  color: ${(props) => props.theme.colors.lightBlue};
	text-shadow: ${(props) => props.theme.global.textShadowGlow};
	text-decoration: none;

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;