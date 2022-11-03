import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
export default {
  siteMetadata: {
    title: 'slicks slices',
    siteUrl: 'https://gatsby.pizza',
    description: 'the best pizza in hamilton',
    twitter: 'slickslices/twitter.com',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-image',
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'zd9gc4hj',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
