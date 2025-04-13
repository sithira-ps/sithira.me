interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <div className="text-primary-100 ounded-sm mr-3 rounded-sm border-1 p-1 px-2 text-xs font-medium uppercase">
      {text.split(' ').join('-')}
    </div>
  )
}

export default Tag
