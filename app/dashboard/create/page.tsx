"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar/Sidebar";
import BuyCredits from "@/components/BuyCredits/BuyCredits";
import "./create.scss";
import promptData from "./prompts.json";
import mbtiData from "./MBTI.json";
import Gallery from "@/components/Gallery/Gallery";
import exp from "constants";
import { set } from "nprogress";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ImageViewer from "react-simple-image-viewer";
import AutoCarousel from "@/components/carousel/AutoCarousel";
import Modal from "../../../components/Modal";
import ButtonGradient from "../../../components/ButtonGradient";

// export const dynamic1 = 'force-dynamic';

export default function Create() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const userId = session?.user?.id;
  const [acronym, setAcronym] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const searchParams = useSearchParams();
  const format = searchParams.get("format");
  let formatTemp = "Smartphone Wallpaper";
  if (format === "square") {
    formatTemp = "Profile Picture/Square Artwork";
  } else if (format === "smatphone") {
    formatTemp = "Smartphone Wallpaper";
  } else if (format === "desktop") {
    formatTemp = "Desktop Wallpaper";
  }
  const [selectedFormat, setSelectedFormat] = useState(formatTemp);
  const [MBTIdescription, setMBTIdescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [title, setTitle] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [gender, setGender] = useState("other");
  const [imageB64, setImageB64] = useState("");
  const credits =
    typeof window !== "undefined"
      ? parseInt(window.localStorage.getItem("credits") || "0")
      : 0;
  const [useCredits, setUseCredits] = useState(credits);

  window.addEventListener("load", function () {
    window.scrollTo(0, 0);
  });
  const [watermarking, setWatermarking] = useState(false);
  let watermark: boolean;

  useEffect(() => {
    console.log("Image URL:", imageUrl);
    setImages([imageUrl]);
  }, [imageUrl]);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(0);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const generateImage = async (quality: string) => {
    setLoading(true);
    let prompt = promptData.prompts.find((p) => p.type === acronym).prompt;
    prompt =
      "I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:" +
      prompt;

    let genderedPrompt;
    if (gender == "man") {
      genderedPrompt = prompt + " The face should be slightly masculine.";
    } else if (gender == "woman") {
      genderedPrompt = prompt + " The face should be slightly feminine.";
    } else {
      genderedPrompt = prompt + " The face must be a non-binary face";
    }

    if (quality === "WATERMARK") {
      setWatermarking(true);
      watermark = true;
    } else {
      setWatermarking(false);
      watermark = false;
    }

    let size: string;
    if (quality === "WATERMARK") {
      size = "1024x1024";
    } else if (selectedFormat === "Profile Picture/Square Artwork") {
      size = "1024x1024";
    } else if (selectedFormat === "Smartphone Wallpaper") {
      size = "1024x1792";
      genderedPrompt =
        genderedPrompt + " The image should be in portrait mode.";
    } else if (selectedFormat === "Desktop Wallpaper") {
      size = "1792x1024";
      genderedPrompt =
        genderedPrompt + " The image should be in landscape mode.";
    }

    let definition = quality === "HD" ? "hd" : "standard";

    const credits = parseInt(localStorage.getItem("credits") || "0");

    let creditsToSubstract: number;
    if (quality === "WATERMARK") {
      creditsToSubstract = 2;
    } else {
      creditsToSubstract = calculateCredits(quality);
    }

    if (credits < creditsToSubstract) {
      router.push("/dashboard/credits");
      return;
    }

    const response = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        genderedPrompt,
        size,
        definition,
        userId,
        watermark,
        acronym
      })
    });

    if (!response.ok) {
      console.error("Failed to generate image");
      setLoading(false);
      return;
    }

    const data = await response.json();
    setImageUrl(data.imageUrl);
    setImageB64(data.imageB64);

    const userResponse = await fetch("/api/updateUserCredits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, creditsToSubstract })
    });

    const responseBody = await userResponse.json();
    let updatedCredits = responseBody.credits;
    localStorage.setItem("credits", updatedCredits);

    if (!userResponse.ok) {
      console.error("Failed to update user credits");
    }
    setLoading(false);
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    switch (activeTab) {
      case "Buy Credits":
        router.push("/dashboard/credits");
        break;
      case "Test":
        router.push("/dashboard/test");
        break;
      case "Smartphone Wallpaper":
        router.push("/dashboard/test?format=smartphone");
        break;
      case "Desktop Wallpaper":
        router.push("/dashboard/test?format=desktop");
        break;
      case "Gallery":
        router.push("/dashboard/gallery");
        break;
      case "Duo":
        router.push("/dashboard/duo");
        break;
      case "Print":
        router.push("/dashboard/print");
        break;
    }
  }, [activeTab, router]);

  const calculateCredits = (definition) => {
    switch (selectedFormat) {
      case "Profile Picture/Square Artwork":
        if (definition === "HD") {
          return 15;
        } else if (definition === "SD") {
          return 8;
        } else {
          return 0;
        }
      case "Smartphone Wallpaper":
        if (definition === "HD") {
          return 25;
        } else if (definition === "SD") {
          return 12;
        } else {
          return 0;
        }
      case "Desktop Wallpaper":
        if (definition === "HD") {
          return 25;
        } else if (definition === "SD") {
          return 12;
        } else {
          return 0;
        }
      default:
        return 0;
    }
  };

  async function giveCouponFreeCredits(coupon: string) {
    let creditsToAdd = 0;
    let usedCoupon;
    if (!coupon) return;
    if (session) {
      console.log("session:", session);
      const userId = session.user.id;
      try {
        const response = await fetch(`/api/user?userId=${userId}`);
        const data = await response.json();
        usedCoupon = data.usedCoupon;
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (
      (coupon === "FAMILY" ||
        coupon === "PH50" ||
        coupon === "LINKEDIN" ||
        coupon === "INSTA" ||
        coupon === "TWITTER" ||
        coupon === "HN50" ||
        coupon === "MATRIX" ||
        coupon === "FRIENDS" ||
        coupon === "MARC") &&
      !usedCoupon
    ) {
      console.log("Coupon:", usedCoupon);
      creditsToAdd = 50;
      const userId = session.user.id;
      console.log("userId:", userId);
      const userResponse = await fetch("/api/updateUserCredits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, creditsToAdd })
      });

      const responseBody = await userResponse.json();
      let updatedCredits = responseBody.credits;
      localStorage.setItem("credits", updatedCredits);
      setUseCredits(updatedCredits);
      setIsModalOpen(true);
    }
  }

  useEffect(() => {
    const storedAcronym = localStorage.getItem("acronym");
    setAcronym(storedAcronym);
    const personality = mbtiData.personalities.find(
      (p) => p.type === storedAcronym
    );
    setTitle(personality?.title);
    setMBTIdescription(personality?.description);
    setExplanation(
      promptData.prompts.find((p) => p.type === storedAcronym).explanation
    );

    setInitialLoading(false);
  }, []);

  // function downloadSoulGem(url): void {
  // 	const downloadLink = `data:image/jpeg;base64,${imageB64}`;
  // 	const a = document.createElement('a');
  // 	a.href = downloadLink;
  // 	a.download = 'SoulGem.jpg';
  // 	a.click();
  // }

  function downloadSoulGem(imageB64) {
    // Helper function to convert base64 to Blob
    const base64ToBlob = (base64, mimeType) => {
      const byteChars = atob(base64);
      const byteNumbers = new Array(byteChars.length);
      for (let i = 0; i < byteChars.length; i++) {
        byteNumbers[i] = byteChars.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: mimeType });
    };

    // Ensure the base64 string has the correct format
    if (!imageB64.startsWith("data:image/")) {
      imageB64 = "data:image/jpeg;base64," + imageB64;
    }

    // Extract the base64 data and MIME type
    const base64Data = imageB64.split(",")[1];
    const mimeType = imageB64.split(",")[0].split(":")[1].split(";")[0];

    // Convert base64 to Blob
    const blob = base64ToBlob(base64Data, mimeType);

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    //a.download = 'SoulGem.jpg';
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <main className="min-h-screen create-container flex w-full">
        <Sidebar onTabClick={handleTabClick} activeTab="Test" />
        <div className="results-container flex-grow">
          <Header />

          <div className="results-header">
            <h1 className="mbti-title mx-auto font-bold opacity-80 text-center">
              Your results
            </h1>
            <h4 className="text-primary text-center mx-auto italic">
              Guess what? You are unique.
            </h4>
          </div>
          {initialLoading ? (
            <div className="w-full h-full bg-base-200">
              <span className="loading loading-lg flex mx-auto"></span>
            </div>
          ) : (
            <section className=" w-5/6 lg:w-2/3 mx-auto mt-10 md:mt-18 lg:mt-24">
              <div className="text-center text-lg mb-1 italic">You are...</div>
              <h2 className="text-center mx-auto text-5xl font-bold italic mbti-type mt-4">
                The <span className="text-primary italic">{title}</span>
              </h2>
              <div className="mbti-description mx-auto mt-10 md:mt-18 lg:mt-24">
                <p className="text-sm md:text-md lg:text-lg opacity-80 leading-relaxed text-center">
                  {MBTIdescription}
                </p>
              </div>
              {loading ? (
                <div className="bg-base-300 mt-8 loader w-64 h-64 mx-auto">
                  <span className="loading loading-lg flex mx-auto"></span>
                </div>
              ) : (
                !imageUrl && (
                  <div className="w-full mx-auto">
                    <h2 className="mx-auto text-sm md:text-md text-accent further font-bold text-center">
                      Go further in your self-discovery journey and craft your
                      unique masterpiece
                    </h2>
                    <h3 className="fit text-primary font-bold mb-2 mt-8">
                      Choose your format:
                    </h3>
                    <div className="formats flex justify-center w-full mx-auto">
                      <div className="format-choice w-32">
                        <div className="h-24 md:h-48 lg:h-64 flex justify-center mb-6 square flex items-center">
                          <Image
                            src="/assets/square.svg"
                            alt="choice"
                            width={200}
                            height={200}
                            onClick={() =>
                              document.getElementById("square-radio").click()
                            }
                          />
                        </div>
                        <input
                          id="square-radio"
                          type="radio"
                          name="radio-2"
                          value="Profile Picture/Square Artwork"
                          className="radio radio-primary"
                          onChange={handleFormatChange}
                          checked={
                            selectedFormat === "Profile Picture/Square Artwork"
                          }
                        />
                      </div>
                      <div className="format-choice w-32 flex items-center">
                        <div className="h-24 md:h-48 lg:h-64 flex justify-center mb-6 square">
                          <Image
                            src="/assets/iphone.svg"
                            alt="choice"
                            width={400}
                            height={400}
                            onClick={() =>
                              document.getElementById("iphone-radio").click()
                            }
                          />
                        </div>
                        <input
                          id="iphone-radio"
                          type="radio"
                          name="radio-2"
                          value="Smartphone Wallpaper"
                          className="radio radio-primary"
                          onChange={handleFormatChange}
                          checked={selectedFormat === "Smartphone Wallpaper"}
                        />
                      </div>
                      <div className="format-choice w-60 flex items-center">
                        <div className="h-24 md:h-48 lg:h-64 flex justify-center mb-6 mac">
                          <Image
                            src="/assets/macbook.svg"
                            alt="choice"
                            width={800}
                            height={800}
                            onClick={() =>
                              document.getElementById("macbook-radio").click()
                            }
                          />
                        </div>
                        <input
                          id="macbook-radio"
                          type="radio"
                          name="radio-2"
                          value="Desktop Wallpaper"
                          className="radio radio-primary"
                          onChange={handleFormatChange}
                          checked={selectedFormat === "Desktop Wallpaper"}
                        />
                      </div>
                    </div>
                    <div className="gender-selection">
                      <h3 className="text-white font-bold mb-2">
                        Select your gender:
                      </h3>
                      <div className="gender-options">
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="man"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "man"}
                            className="radio radio-accent gender-radio"
                          />
                          Man
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="woman"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "woman"}
                            className="radio radio-accent gender-radio"
                          />
                          Woman
                        </label>
                      </div>
                    </div>
                    <div className="h-16 flex items-center"></div>
                    {credits < 8 && credits > 1 ? (
                      <div className="flex justify-center flex-col items-center">
                        <button
                          className="btn btn-secondary flex justify-center w-2/3 md:w-2/5 leading-6 h-16 hover:scale-90 mb-2"
                          onClick={() => generateImage("WATERMARK")}
                        >
                          <div className="line-container">
                            <div>I want to try!</div>
                            <div>4 credits</div>
                          </div>
                        </button>
                        <div className="mb-12 text-center text-md">
                          This will create a watermarked square image in
                          standard quality.
                          <br />
                          Get more credits to create an awesome HD
                          <span className="notranslate"> SoulGem</span> in any
                          format and without a watermark!
                        </div>
                        <div>
                          <div className="coupon-container">
                            <input
                              type="text"
                              placeholder="Add your coupon here!"
                              className="input input-bordered w-full max-w-xs"
                              value={coupon}
                              onChange={(e) => setCoupon(e.target.value)}
                            />
                            <ButtonGradient
                              title="Apply Coupon"
                              onClick={() => giveCouponFreeCredits(coupon)}
                            />
                          </div>
                          <div className="mt-4 mb-12 italic text-sm text-center">
                            Hint: What&apos;s the greatest film of all time? 🎬
                          </div>
                        </div>
                        {isModalOpen && (
                          <Modal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                          />
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="md:mt-2 flex-column-reverse md:flex justify-center">
                      <button
                        className="btn btn-primary create-btn mr-4 xl:w-2/5 text-white"
                        onClick={() => generateImage("HD")}
                      >
                        <div className="line-container">
                          <div>{selectedFormat}</div>
                          <div className="text-lg">
                            in HD: {calculateCredits("HD")} credits
                          </div>
                        </div>
                      </button>
                      <button
                        className="btn btn-primary btn-outline create-btn ml-4 xl:w-2/5 text-white"
                        onClick={() => generateImage("SD")}
                      >
                        <div className="line-container">
                          <div>{selectedFormat}</div>
                          <div className="text-lg">
                            {calculateCredits("SD")} credits
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )
              )}
              {imageUrl && (
                <>
                  <div className="soulgem mx-auto mt-8">
                    {selectedFormat === "Profile Picture/Square Artwork" && (
                      <Image
                        src={imageUrl}
                        width={400}
                        height={400}
                        alt={explanation}
                        onClick={() => openImageViewer(1)}
                      />
                    )}
                    {selectedFormat === "Smartphone Wallpaper" && (
                      <Image
                        src={imageUrl}
                        width={400}
                        height={800}
                        alt={explanation}
                        onClick={() => openImageViewer(1)}
                      />
                    )}
                    {selectedFormat === "Desktop Wallpaper" && (
                      <Image
                        src={imageUrl}
                        width={1600}
                        height={800}
                        alt={explanation}
                        onClick={() => openImageViewer(1)}
                      />
                    )}

                    {isViewerOpen && (
                      <ImageViewer
                        src={images}
                        currentIndex={currentImage}
                        disableScroll={false}
                        closeOnClickOutside={true}
                        onClose={closeImageViewer}
                      />
                    )}
                  </div>
                  <h3 className="fit text-center text-sm italic flex md:hidden">
                    Hold press on the image to download it!
                  </h3>
                  <h2 className="text-primary fit mt-4 font-bold text-center">
                    Your SoulGem Is Unique, Be Proud & Showcase It To The World!
                  </h2>
                  <div
                    className="btn btn-primary btn-outline justify-center hidden md:flex md: md:w-1/3 lg:w-1/4 mx-auto md:mt-2 md:mb-12"
                    onClick={() => downloadSoulGem(imageB64)}
                  >
                    Download my SoulGem
                  </div>

                  <p className="mbti-explanation mt-12 text-sm md:text-md lg:text-lg opacity-80 leading-relaxed mx-auto text-center">
                    {explanation}
                  </p>
                  {watermarking && (
                    <div>
                      <div className="text-center text-md mt-8 italic text-center">
                        Like your SoulGem? Create an even better one with
                        greater details and without a watermark! <br /> Get more
                        credits to unlock the full potential of your unique
                        personality.
                      </div>
                    </div>
                  )}
                  <>
                    <div className="text-center text-md mt-8 italic text-center">
                      Take a new test with new questions, create a new SoulGem
                      and discover another facet of your personality!
                    </div>
                    <div className="flex justify-center items-center mt-8">
                      <Link href="/dashboard/test">
                        <button className="btn btn-secondary flex justify-center mr-4">
                          Take a new test
                        </button>
                      </Link>
                      <Link href="/dashboard/gallery">
                        <button className="btn btn-secondary btn-outline flex justify-center mx-auto">
                          Go to your gallery
                        </button>
                      </Link>
                    </div>
                  </>
                </>
              )}
              <div className="text-center text-lg mt-24 italic text-center">
                Take a look at some of the amazing HD SoulGems created by our
                lovely users :
              </div>
              <div className="carousel-border">
                <AutoCarousel />
              </div>
            </section>
          )}
          <Footer />
        </div>
      </main>
    </>
  );
}
