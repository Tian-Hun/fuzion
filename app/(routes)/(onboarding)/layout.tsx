const OnBoardingLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <main
            className="pt-120px min-h-screen flex justify-center"
            style={{ backgroundImage: 'linear-gradient(325deg, #130f40 0%, #070707 40%)'}}
        >
            {children}
        </main>
    );
};

export default OnBoardingLayout;
