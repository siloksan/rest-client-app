import { render } from '@testing-library/react';
import { Field, Fields, initialField } from './fields';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('Fields', () => {
  it('Render fields', async () => {
    const testFields: Field = {
      id: 1,
      isActive: true,
      fieldKey: 'test-key',
      value: 'test-value',
    };

    render(<Fields handler={() => {}} value={[testFields]} />);

    const checkbox = screen.getByRole('checkbox');
    const keyField = screen.getByDisplayValue(testFields.fieldKey);
    const valueField = screen.getByDisplayValue(testFields.value);

    expect(checkbox).toBeInTheDocument();
    expect(keyField).toBeInTheDocument();
    expect(valueField).toBeInTheDocument();
  });

  it('Add new fields', async () => {
    const mockHandler = vi.fn();

    render(<Fields handler={mockHandler} value={[]} />);
    await userEvent.click(screen.getByRole('button', { name: /add field/i }));

    expect(mockHandler).toBeCalledTimes(1);

    const setState = mockHandler.mock.calls[0][0];
    const result = setState([initialField]);

    expect(result[0]).toEqual(initialField);
  });

  it('Change active fields', async () => {
    const mockHandler = vi.fn();
    const testFields: Field[] = [
      {
        id: 0,
        isActive: true,
        fieldKey: 'test-key',
        value: 'test-value',
      },
    ];

    render(<Fields handler={mockHandler} value={testFields} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(mockHandler).toHaveBeenCalled();
    const setState = mockHandler.mock.calls[0][0];
    const result = setState(testFields);

    expect(result).toEqual([{ ...testFields[0], isActive: false }]);
  });

  it.each([
    { fieldName: 'fieldKey', defaultValue: 'test-key' },
    { fieldName: 'value', defaultValue: 'test-value' },
  ])('Change field $fieldName', async ({ fieldName, defaultValue }) => {
    const mockHandler = vi.fn();
    const testFields: Field[] = [
      {
        id: 0,
        isActive: true,
        fieldKey: 'test-key',
        value: 'test-value',
      },
    ];

    render(<Fields handler={mockHandler} value={testFields} />);

    const input = screen.getByDisplayValue(defaultValue);

    await userEvent.clear(input);

    expect(mockHandler).toHaveBeenCalled();

    const setState = mockHandler.mock.calls[0][0];
    const result = setState(testFields);

    expect(result).toEqual([{ ...testFields[0], [fieldName]: '' }]);
  });
});
