import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/Footer";

const CommonLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer />
        </div>
    );
};

export default CommonLayout;