import { UserPlusIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Form } from 'react-router-dom';
import illustration from '../assets/illustration.jpg';

const Intro = () => {
  return (
    <div className='intro'>
      <div>
        <h1>
          Take Control of <span className='accent'>You money</span>
        </h1>
        <p>
          Personal budgeting is the secret of financial freedom. start your
          journey today.
        </p>
        <Form method='post'>
          <input
            type='text'
            name='userName'
            required
            placeholder='What is your name?'
            aria-label='Your name'
            autoComplete='give-name'
          />
          <button type='submit' className='btn btn--dark'>
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustration} alt='Person with money' width={600} />
    </div>
  );
};

export default Intro;
