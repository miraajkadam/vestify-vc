import React from "react";

function Team({ teamAndAdvisors }: any) {
  // console.log(teamAndAdvisors);
  return (
    <div className="h-[266.37px] w-full flex-col justify-start items-center gap-2.5 flex">
      <div className="w-full px-[275.50px] py-2 bg-[#f8f8f8] rounded-lg justify-center items-center gap-2.5 inline-flex">
        <div className="w-full text-[#18191c] text-2xl font-bold font-['Urbanist'] leading-loose">
          Team and Advisors
        </div>
      </div>

      <div className="w-full justify-between items-center gap-[22.32px] inline-flex">
        {teamAndAdvisors.map((member: any, index: number) => (
          <div className="w-[238.45px] flex-col justify-start items-start gap-[20.09px] inline-flex">
            <div className="w-[238.45px] h-[208.37px] relative">
              <img
                className="w-[238.45px] h-[181.91px] left-0 top-0 absolute rounded-[11.16px]"
                // src="https://via.placeholder.com/238x182"
                src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg"
              />
              <div className="h-[53.25px] p-[11.16px] left-[16px] top-[155.12px] absolute bg-white rounded-[8.93px] justify-start items-center gap-[77px] inline-flex">
                <div className="w-full flex-col justify-start items-start gap-[8.93px] inline-flex">
                  <div className="self-stretch text-[#505050] text-lg font-bold font-['Urbanist'] leading-relaxed">
                    {member.name}
                  </div>
                  <div className="text-[#949494] text-sm font-medium font-['Urbanist'] leading-tight">
                    Founder
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
