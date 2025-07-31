export default function AuthLayout (props) {
    const {children, variant} = props
    return (
        <main className="flex w-full h-screen oveflow-hidden ">
            <section className={`w-1/3 relative ${variant === 'login' ? 'bg-orange-primary' : 'bg-blue-primary'}`}>
                <img src="/images/logo-white.png" alt="logo" className="w-20 absolute top-10 left-10 z-10" />
                <img src="/images/auth-logo.png" alt="auth-logo" className="absolute -top-10 -left-30 w-full opacity-[0.2]" /> 
            </section>

            <section className="min-h-screen w-full flex-1 px-16 py-8 overflow-y-auto">
                <div className="flex items-center justify-center min-h-full">
                    {children}
                </div>
            </section>            
        </main>
    )
}