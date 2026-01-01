"use client";
import React, { useState, useRef, useEffect } from "react";
import { Image_NotFound, Image_URL } from "@/config/constants";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { listingsApi } from "@/lib/api/listings";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MarketplaceCard from "./MarketplaceCard";

const PopularProductCard = ({
  cards: initialCards,
  categories,
  layout = "grid",
}) => {
  const filterCategories = categories?.data || [];
  const [activeCategory, setActiveCategory] = useState(null);
  const [cards, setCards] = useState(initialCards || []);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollRef = useRef(null);

  console.log("aaaaa Check Cards from Page:", cards);

  useEffect(() => {
    console.log("All Categories from API:", filterCategories);

    const mobileCategory = filterCategories.find(
      (cat) =>
        cat.name.toLowerCase().includes("mobile") ||
        cat.slug?.toLowerCase().includes("mobile")
    );

    if (mobileCategory) {
      console.log("Default Mobile Category Found:", mobileCategory);

      setActiveCategory(mobileCategory.id);

      const fetchMobileProducts = async () => {
        setLoading(true);
        const payload = {
          category_id: mobileCategory.id,
        };
        try {
          const data = await listingsApi.getListingsByFilter(payload);
          console.log("aaaaa Check Listing from Page:", data)
          setCards(data || []);
        } finally {
          setLoading(false);
        }
      };

      fetchMobileProducts();
    }
  }, [filterCategories]);

  const handleCategoryClick = async (category) => {
    setActiveCategory(category.id);
    setLoading(true);
    const payload = {
      category_id: category.id,
    };
    try {
      const data = await listingsApi.getListingsByFilter(payload);
      setCards(data || []);
    } finally {
      setLoading(false);
    }
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(checkScroll, 400);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <div className="my-10 px-4 sm:px-8 md:px-8">
      <h2 className={`text-2xl font-semibold pb-1 mb-6 text-center`}>
        <span className="inline-block border-b-2 border-gray-400">
          {t("Popular Products")}
        </span>
      </h2>

      {/* Category Buttons */}
      <div className="relative mb-6">
        <div className="flex gap-2 overflow-x-auto px-3 py-2 sm:justify-center scrollbar-hide">
          {filterCategories.map((category) => (
            <button
              key={category.id}
              className={`flex-shrink-0 px-4 py-2 text-sm rounded-full border transition-all duration-200
          ${activeCategory === category.id
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-green-200"
                }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="text-center py-10">{t("Loading")}...</div>
      ) : cards?.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-medium">
          {t("No products available")}
        </div>
      ) : (
        <div className="mx-0 md:mx-6">
          <MarketplaceCard
            heading=""
            // cards={listings?.data?.slice(0, 8) || []}
            cards={cards}
            seeMoreLink="/hotDeals"
          />
        </div>
      )}
    </div>
  );
};

export default PopularProductCard;
