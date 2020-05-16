import React from 'react'
import { act } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter'
import api from '../services/api'
import { BrowserRouter as Router } from 'react-router-dom';

const apiMock = new MockAdapter(api)
import Home from '../pages/Home'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import { mount } from 'enzyme';
import { expect } from 'chai';

describe("Home component", () => {
  it("should be able to render questions", async () => {

    apiMock.onGet("/questions").reply(200,
      [{
        "_id": "5ebde2f7eb02040aff3450d1",
        "code": "80be71e4-9567-4341-9364-f3520e9f1e6d",
        "username": "Luan Santos",
        "text": "What is your name?",
        "createdAt": "2020-05-15T00:31:51.160Z",
        "answers": []
      },
      {
        "_id": "5ebde2f7eb020fds40aff3450d1",
        "code": "80be71e4-9567-4341-9364-f3520e9f1e6d",
        "username": "Luan Santos",
        "text": "What is your name?",
        "createdAt": "2020-05-15T00:31:51.160Z",
        "answers": []
      }
    ]);

    const wrapper = mount(<Router><Home/></Router>);

    await act(async () => {
      await Promise.resolve(Home);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
  });

    expect(wrapper.find('div[data-testid="questions-list"]')
    .childAt(0)
    .find('.question-content p')
    .text())
    .equal("What is your name?");
  });

  it("should be able to create a new question", async () => {

    apiMock.onGet("/questions").reply(200, []);

    apiMock.onPost("/questions").reply(200,
      {
        "_id": "5ebde2f7eb02040aff3450d1",
        "code": "80be71e4-9567-4341-9364-f3520e9f1e6d",
        "username": "Luan Santos",
        "text": "What is your name????",
        "createdAt": "2020-05-15T00:31:51.160Z",
        "answers": []
      }
    );

    const wrapper = mount(<Router><Home/></Router>);

    await act(async () => {
      await Promise.resolve(Home);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    wrapper.find('textarea').simulate('change', {
      target: { value: 'What time is it?' }
    })

    wrapper.find('textarea').simulate('keyPress', { charCode: 13 })

    await act(async () => {
      await Promise.resolve(Home);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(wrapper.find('div[data-testid="questions-list"]')
    .childAt(0)
    .find('.question-content p')
    .text())
    .equal("What time is it?");
  });
})
