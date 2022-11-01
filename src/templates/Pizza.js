import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { title } from 'process';
import SEO from '../components/SEO';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function Pizza({ data: { pizza } }) {
  return (
    <>
      <SEO title={title.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaGridStyles>
        <Helmet>
          <title>{pizza.name}</title>
        </Helmet>
        <Img fluid={pizza.image.asset.fluid} />
        <ul>
          {pizza.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
        <h2 className="mark">{pizza.name}</h2>
      </PizzaGridStyles>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegeterian
      }
    }
  }
`;
