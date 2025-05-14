export default function HomeView() {
  return (
    <div x-data="{count: 0}">
      <button x-on:click="count++">
        Count is <span x-text="count"></span>
      </button>
    </div>
  );
}
