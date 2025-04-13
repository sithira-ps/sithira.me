interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <div
      className="text-primary-100 border-1 mr-3 text-xs rounded-sm p-1 px-2 ounded-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </div>
  )
}

export default Tag
