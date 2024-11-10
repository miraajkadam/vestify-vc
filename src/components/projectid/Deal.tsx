import React from "react";

function Deal({ socialLink, project, tokenMetrics }: any) {
  const firstToken = tokenMetrics[0];
  console.log("firstToken", firstToken);
  console.log("socialLink", socialLink);
  return (
    <div className="p-5 h-full bg-neutral-100 rounded-[10px] flex-col justify-start items-start gap-[30px] inline-flex">
      <div className="text-[#18191c] text-2xl font-bold font-['Urbanist'] leading-loose">
        Deal Info
      </div>
      <div className="h-full flex-col justify-start items-center gap-5 flex">
        <div className="self-stretch h-full flex-col justify-start items-start gap-2.5 flex">
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="text-[#18191c] text-[17px] font-bold font-['Urbanist'] leading-loose">
              Token price
            </div>

            <div className="text-right text-[#a5a5a5] text-[17px] font-bold font-['Urbanist'] leading-loose">
              {firstToken?.round} Round ${firstToken?.price}
            </div>
          </div>
          <div className="justify-start items-start gap-[89px] inline-flex">
            <div className="text-[#18191c] text-[17px] font-bold font-['Urbanist'] leading-loose">
              Vesting
            </div>
            <div className="text-right text-[#a5a5a5] text-[17px] font-bold font-['Urbanist'] leading-[33px]">
              {firstToken?.tgeUnlock}% on TGE,3 Month cliff, 10% monthly
              <br />
              thereafter.
            </div>
          </div>
        </div>
        <div className="flex-col justify-start items-center gap-2.5 flex">
          <div className="justify-start items-center gap-2.5 inline-flex">
            <a
              href={socialLink?.medium}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="px-[15px] py-3 bg-white rounded-lg justify-start items-center gap-[25.34px] flex">
                <div className="justify-start items-center gap-[16.89px] flex">
                  <div className="w-[42.23px] h-[42.23px] bg-[#f3f3f3] rounded-lg justify-center items-center gap-[0.84px] flex" />
                  <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                    Medium
                  </div>
                </div>
                <div className="w-[13.51px] h-[13.51px] relative" />
              </div>
            </a>
            <a
              href={socialLink?.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="px-[15px] py-3 bg-white rounded-lg justify-start items-center gap-[25.34px] flex">
                <div className="justify-start items-center gap-[16.89px] flex">
                  <div className="w-[42.23px] h-[42.23px] bg-[#ffeee8] rounded-lg flex-col justify-center items-center gap-[8.45px] inline-flex">
                    <div className="w-[19.43px] h-[18.58px] relative" />
                  </div>
                  <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                    Website
                  </div>
                </div>
                <div className="w-[13.51px] h-[13.51px] relative" />
              </div>
            </a>
          </div>

          <div className="h-full self-stretch justify-start items-center gap-2.5 inline-flex">
            <a href={socialLink?.x} target="_blank" rel="noopener noreferrer">
              <div className="px-[15px] py-3 bg-white rounded-lg justify-start items-center gap-[25.34px] flex">
                <div className="justify-start items-center gap-[16.89px] flex">
                  <div className="w-[42.23px] h-[42.23px] p-[8.45px] bg-[#eef9ff] rounded-lg flex-col justify-center items-center gap-[8.45px] inline-flex" />
                  <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                    Twitter
                  </div>
                </div>
                <div className="w-[13.51px] h-[13.51px] relative" />
              </div>
            </a>
            <a
              href={socialLink?.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="px-[15px] py-3 bg-white rounded-lg justify-start items-center gap-[25.34px] flex">
                <div className="justify-start items-center gap-[16.89px] flex">
                  <div className="w-[42.23px] h-[42.23px] bg-[#eaf7fd] rounded-lg flex-col justify-center items-center gap-[8.45px] inline-flex" />
                  <div className="text-[#18191c] text-sm font-semibold font-['Urbanist'] leading-tight">
                    Telegram
                  </div>
                </div>
                <div className="w-[13.51px] h-[13.51px] relative" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deal;
