import "./styles/global.css";

function App() {
  return (
    <main className="h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center">
      <form action="" className="flex flex-col gap-4 w-full max-w-xs">
        <div className="flex flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            className="border border-zinc-20 shadow-sm rounded h-10 px-3"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input
            type="password"
            className="border border-zinc-20 shadow-sm rounded h-10 px-3"
            name="password"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}

export default App;
