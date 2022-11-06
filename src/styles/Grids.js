import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(var(--columns),min-max(auto, 1fr));
  @media (max-width:800px) {
    --columns: 1;
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  row-gap: 4rem;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const ItemStyles = styled.div`
  background: var(--lightyellow);
  text-align: center;
  position: relative;
  /* height: 30rem; */
  img {
    height: 250px;
    font-size: 0;
    object-fit: cover;
  }
  p {
    transform: rotate(-2deg) translateY(-10px);
    position: absolute;
    width: 100%;
    left:0;
    margin:0;
    font-size:2rem;
    font-size:clamp(12px, 5vw, 20px);
  }
  .mark {
    display: inline;
  }
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img.loading {
    --shine: white;
    --background: var(--red);
    background-image: linear-gradient(
      90deg,
      var(---background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    animation: shine 1s infinite linear;
  }
`;
