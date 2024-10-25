const Layout = ({ children }) => {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl">AutoShop</h1>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          © {new Date().getFullYear()} AutoShop. All rights reserved.
        </footer>
      </div>
    );
  };
  
  export default Layout;
  