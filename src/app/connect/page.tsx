import { ConnectedPlatform } from "./_components/ConnectedPlatform";

const platforms = [
  {
    smp: "Youtube",
    url: "/api/google/login",
    styles: "bg-red-500 text-white",
  },
  {
    smp: "Facebook",
    url: "/api/facebook/login",
    styles: "bg-blue-600 text-white",
  },
];

const Connect = async () => {
  return (
    <>
      <div>
        <h1>Connect</h1>
        <ul>
          {platforms.map((item, idx) => (
            <li key={`${idx}---${item}`}>
              {
                <ConnectedPlatform
                  socialMediaPlatform={item.smp}
                  url={item.url}
                  className={item.styles}
                />
              }
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Connect;
