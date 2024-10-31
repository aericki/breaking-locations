/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */


import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type InputProps = {
  label: string;
  name: string;
  value?: string;
  onChange: Function;
  placeholder: string


}

export function InputStyled(props: InputProps) {
  return (
    <div className='flex flex-col gap-2'>
      <Label>{props.label}</Label>
      <Input
        className='bg-gray-100  placeholder:text-gray-400 placeholder:font-light font-normal'
        name={props.name}
        type='text'
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => {
          props.onChange((previousState: any) => ({
            ...previousState,
            [props.name]: e.target.value
          }));
        }}
        required
      />
    </div>
  );
}