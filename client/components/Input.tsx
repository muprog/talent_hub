interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = ({ label, ...props }: InputProps) => (
  <div className='flex flex-col mb-4'>
    <label className='mb-1 font-semibold text-primary'>{label}</label>
    <input
      {...props}
      className='border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary'
    />
  </div>
)

export default Input
