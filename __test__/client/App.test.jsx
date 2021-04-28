import App from "../../src/client/App";
import * as ReactDOM from "react-dom";
import * as React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";


describe("application", () => {
  it("can show home page", async () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <RecoilRoot>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </RecoilRoot>,
      container
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h2").textContent).toEqual(
      "Start a conversation, join Convey today!"
    );
  });

  it("can navigate to profile", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <RecoilRoot>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </RecoilRoot>,
        container
      );
    });
    
    const createBookLink = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Profile"
    );
    await act(async () => {
      await createBookLink.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Profile"
    );
  });

  it("can navigate to rooms", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <RecoilRoot>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </RecoilRoot>,
        container
      );
    });
    
    const createBookLink = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Rooms"
    );
    await act(async () => {
      await createBookLink.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Rooms"
    );
  })
});