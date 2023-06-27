import React, { ReactElement } from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import Button, { Props } from './index';

describe('Button', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(<Button onClick={() => {}}>Test Button</Button>);
  });

  it('renders correctly', () => {
    expect(renderResult.getByText('Test Button')).toBeInTheDocument();
  });

  it('is disabled when the disabled prop is true', () => {
    renderResult.rerender(<Button disabled onClick={() => {}}>Test Button</Button>);
    expect(renderResult.getByText('Test Button')).toBeDisabled();
  });

  it('shows a loader when the isLoading prop is true', () => {
    renderResult.rerender(<Button isLoading onClick={() => {}}>Test Button</Button>);
    expect(renderResult.getByTestId('loader')).toBeInTheDocument();
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    renderResult.rerender(<Button onClick={handleClick}>Test Button</Button>);
    fireEvent.click(renderResult.getByText('Test Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('Button type checking', () => {
  const props: Props = {
    children: 'Test Button',
    style: {},
    className: '',
    disabled: false,
    isLoading: false,
    onClick: () => {},
  };

  it('Button component should accept correct props', () => {
    const button: ReactElement = <Button {...props} />;
    expect(button).toBeDefined();
  });

  it('Button component should not accept incorrect props', () => {
    // @ts-expect-error
    const button: ReactElement = <Button {...{ ...props, unknownProp: true }} />;
    expect(button).toBeDefined();
  });
});
