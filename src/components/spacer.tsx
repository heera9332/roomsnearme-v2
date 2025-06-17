import { cn } from '@/lib/utils'

type SpacerProps = {
  height?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>

const Spacer = ({ height = 12, className, ...args }: SpacerProps) => {
  return (
    <div
      style={{ height }}
      className={cn('w-full', className)}
      {...args}
    />
  )
}

export default Spacer
