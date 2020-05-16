import React from 'react'
import { act } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'
import api from '../services/api'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const apiMock = new MockAdapter(api)
import QuestionDetails from '../pages/QuestionDetails'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { mount } from 'enzyme';
import { expect } from 'chai';

import { MemoryRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

describe("QuestionDetails component", () => {
  it("should be able to render a question", async () => {

    apiMock.onGet("/questions/123321").reply(200,
        {
          "_id": "123321",
          "code": "80be71e4-9567-4341-9364-f3520e9f1e6d",
          "username": "Luan Santos",
          "text": "What time is it?",
          "createdAt": "2020-05-15T00:31:51.160Z",
          "answers": []
        },
    );

    const wrapper = mount(
      <MemoryRouter initialEntries={["question/123321"]}>
        <Route path="question/:id">
          <QuestionDetails/>
        </Route>
      </MemoryRouter>
    );

    await act(async () => {
      await Promise.resolve(QuestionDetails);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(wrapper
    .find('.question-content p')
    .text())
    .equal("What time is it?");
  })

  it("should be able to create a new answer", async () => {

    apiMock.onGet("/questions/123321").reply(200,
      {
        "_id": "123321",
        "code": "123321",
        "username": "Luan Santos",
        "text": "What time is it?",
        "createdAt": "2020-05-15T00:31:51.160Z",
        "answers": []
      },
    );

    apiMock.onPost("/questions/123321/answers").reply(200,
      {
        code: "145413",
        text: "I want to know too.",
        username: "User",
        createdAt: "2020-05-15T00:31:51.160Z",
        likes: [],
      }
    );

    const wrapper = mount(
      <MemoryRouter initialEntries={["question/123321"]}>
        <Route path="question/:id">
          <QuestionDetails/>
        </Route>
      </MemoryRouter>
    );

    await act(async () => {
      await Promise.resolve(QuestionDetails);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    wrapper.find('textarea').simulate('change', {
      target: { value: "I want to know too." }
    })

    await act(async () => {
      await Promise.resolve(QuestionDetails);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    wrapper.find('textarea').simulate('keyPress', { charCode: 13 })

    expect(wrapper.find('.answer-data .answer-text')
    .text())
    .equal("I want to know too.");
  })
})
