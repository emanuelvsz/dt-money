export interface IBodyContainerProps {
    children: React.ReactNode;
}

export function BodyContainer({ children }: IBodyContainerProps) {
  return (
    <div className="mx-auto max-w-[1120px] -mt-16" style={{
        display: 'flex', 
        gap: "4rem", 
        flexDirection: 'column'
    }}>
        {children}
    </div>
  )
}