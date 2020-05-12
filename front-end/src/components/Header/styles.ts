import styled from 'styled-components'

export const Header = styled.div`
  width: 100%;
  background-color: #384554;
  border-bottom: solid 4px #4bde95;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 960px;
    height: 60px;
    margin: 0 auto;
    padding: 0 20px;
  }

  div.brand {
    a {
      color: #fff;
      text-decoration: none;
      text-transform: uppercase;
      font-size: 26px;
      font-weight: 700;
    }
  }

  nav {
    display: flex;

    ul {
      display: flex;
      align-items: center;

      li {
        list-style: none;
        margin-left: 20px;

        a {
          color: #fff;
          text-decoration: none;
        }
      }
    }

    div.user {
      display: flex;
      margin-left: 60px;

      img {
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }

      div.user-data {
        display: flex;
        flex-direction: column;
        color: #fff;

        a {
          text-decoration: none;
          color: #fefefe;
        }
      }
    }
  }
`
