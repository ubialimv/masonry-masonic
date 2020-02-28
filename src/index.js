// Concurrent Mode example
import React from "react";
import ReactDOM from "react-dom";
import useWindowScroll from "@react-hook/window-scroll";
import catNames from "cat-names";
import { styles, system } from "./theme";
import cats from "./cats";
import { Masonry } from "masonic";

const App = () => {
  return (
    <main className={style("container")}>
      <div className={style("masonic")}>
        <Masonry
          items={items}
          columnGutter={8}
          columnWidth={172}
          overscanBy={6}
          render={FakeCard}
        />
      </div>
      <Header />
    </main>
  );
};

const FakeCard = React.memo(
  props => (
    <div className={style("card")}>
      <img className={style("img")} alt="kitty" src={getImage(props.data.id)} />
      <span children={getName(props.data.id)} />
    </div>
  ),
  (p, n) => p.id === n.id
);

const Header = () => {
  const scrollY = useWindowScroll(5);
  return (
    <h1 className={style("header", scrollY > 64 && "minify")}>
      <span role="img" aria-label="bricks">
        🧱
      </span>{" "}
      MASONIC
    </h1>
  );
};

const style = styles({
  masonic: `
    padding: 8px;
    width: 100%;
    max-width: 960px;
    margin: 163px auto;
  `,
  container: `
    min-height: 100vh;
    width: 100%;
  `,
  minify: ({ pad, color }) => `
    padding: ${pad.md};
    background-color: ${color.dark};
    color: ${color.light};
  `,
  header: ({ pad }) => `
    ${system.font.css("logo")};
    top: 0;
    position: fixed;
    padding: ${pad.xl};
    z-index: 1000;
    width: 100%;
    text-align: center;
    transition: padding 200ms ease-in-out, background-color 200ms 200ms linear;
  `,
  card: ({ shadow, color, pad, radius }) => `
    display: flex;
    flex-direction: column;
    background: ${color.dark};
    border-radius: ${radius.lg};
    justify-content: center;
    align-items: center;
    transition: transform 100ms ease-in-out;
    width: 100%;

    span:last-of-type {
      color: #fff;
      padding: ${pad.md};
    }

    &:hover {
      position: relative;
      background: ${color.light};
      transform: scale(1.125);
      z-index: 1000;
      box-shadow: ${shadow.lg};

      span:last-of-type {
        color: ${color.dark};
        padding: ${pad.md};
      }
    }
  `,
  img: ({ radius }) => `
    width: 100%;
    display: block;
    border-top-left-radius: ${radius.md};
    border-top-right-radius: ${radius.md};
    display: block;
  `
});

const images = {};
const getImage = id => {
  if (images[id] === void 0) images[id] = randomChoice(cats);
  return images[id];
};
const names = {};
const getName = id => {
  if (names[id] === void 0) names[id] = catNames.random();
  return names[id];
};
const randomChoice = items => items[Math.floor(Math.random() * items.length)];
const getFakeItems = (cur = 0) => {
  const fakeItems = [];
  for (let i = 5000 * cur; i < cur * 5000 + 5000; i++)
    fakeItems.push({ id: i });
  return fakeItems;
};
const items = getFakeItems();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
