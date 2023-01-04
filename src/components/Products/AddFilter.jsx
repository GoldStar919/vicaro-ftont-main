import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Button, Modal, Tabs, Accordion } from "flowbite-react"
import { HiOutlineFilter, HiOutlineTrash } from "react-icons/hi";
import Select from 'react-tailwindcss-select';
import swal from 'sweetalert2';
import styled from 'styled-components';
import MultiRange from "../Global/MultiRange";
import { useTranslation } from "react-i18next";

export const SelectCustomStyle = styled.div`
.flex.text-sm.text-gray-500.border.border-gray-300.rounded.shadow-sm.transition.duration-300{
	min-height: 42px
}
`

function AddFilter(props) {
    const { t } = useTranslation();
    const { globalState, locationState, producerState } = useSelector((state) => state);

    const { winecolors, bottlesizes, countries, total_regions, total_subregions, grapes, aromas, foods, allergies, closureTypes, tastes, global_product_types } = locationState;
    const { total_producers } = producerState;
    const nowDate = new Date();

    useEffect(() => {
    }, [])

    const [modalShow, setModalShow] = useState(false);
    const [filterData, setFilterData] = useState({
        // for Properties
        wine_color: null,
        wine_type: null,
        grape: null,
        taste: null,
        producer: null,
        spirit_sub_type: null,
        spirit_type: null,
        beer_type: null,
        country: null,
        region: null,
        sub_region: null,
        aroma: null,
        food: null,
        // for information
        vintage: null,
        allergy: null,
        closure_type: null,
        bottle_size: null,
        alc_vol: [0, 100],
        wine_acid: [0, 100],
        residual_sugar: [0, 100],

        product_type: "",
        article: "",
        fortified_wine_type: "",
        barrel_type: "",
    });

    //for properties
    const country_options = [];
    const region_options = [];
    const subregion_options = [];
    const winecolor_options = [];
    const winetype_options = [];
    const spirittype_options = [];
    const beertype_options = [];
    const taste_options = [];
    const grape_options = [];
    const aroma_options = [];
    const food_options = [];
    const producer_options = [];
    const spiritsubtype_options = [];
    //for information
    const vintage_options = [];
    const bottlesize_options = [];
    const allergy_options = [];
    const closureType_options = [];

    // country
    if (countries?.length > 0) {
        countries.map((data, index) => {
            country_options[index] = { value: data._id, label: data.name[`${globalState.language}`] }
        })
    }
    // region
    if (total_regions?.length > 0) {
        total_regions.map((data, index) => {
            region_options[index] = { value: data._id, label: data.name[`${globalState.language}`] }
        })
    }
    // subregion
    if (total_subregions?.length > 0) {
        total_subregions.map((data, index) => {
            subregion_options[index] = { value: data._id, label: data.name[`${globalState.language}`] }
        })
    }
    //category & winetype & fortified
    if (global_product_types?.length > 0) {
        let wine_cnt = 0, spirit_cnt = 0, beer_cnt = 0, spiritsub_cnt = 0;
        global_product_types.map((data, index) => {
            if (data.product_type == 0 && data.sub_category == null) {
                winetype_options[wine_cnt] = { value: data._id, label: data[`${globalState.language}`] };
                wine_cnt++;
            }
            if (data.product_type == 1 && data.sub_category == null) {
                spirittype_options[spirit_cnt] = { value: data._id, label: data[`${globalState.language}`] };
                spirit_cnt++;
            }
            if (data.product_type == 2 && data.sub_category == null) {
                beertype_options[beer_cnt] = { value: data._id, label: data[`${globalState.language}`] };
                beer_cnt++;
            }
            if (data.product_type == 1 && data.sub_category >= 0 && data.category >= 0) {
                spiritsubtype_options[spiritsub_cnt] = { value: data._id, label: data[`${globalState.language}`] };
                spiritsub_cnt++;
            }
        })
    }
    //winecolor
    if (winecolors?.length > 0) {
        winecolors.map((data, index) => {
            winecolor_options[index] = { value: data._id, label: data.name }
        })
    }
    //tastes
    if (tastes?.length > 0) {
        tastes.map((data, index) => {
            taste_options[index] = { value: data._id, label: data[`${globalState.language}`] }
        })
    }
    //grape
    if (grapes?.length > 0) {
        grapes.map((data, index) => {
            grape_options[index] = { value: data._id, label: data[`${globalState.language}`] }
        })
    }
    //aroma
    if (aromas?.length > 0) {
        aromas.map((data, index) => {
            aroma_options[index] = { value: data._id, label: data[`${globalState.language}`] }
        })
    }
    //food
    if (foods?.length > 0) {
        foods.map((data, index) => {
            food_options[index] = { value: data._id, label: data[`${globalState.language}`] }
        })
    }
    //producer
    if (total_producers?.length > 0) {
        total_producers.map((data, index) => {
            producer_options[index] = { value: data._id, label: data.name }
        })
    }
    //vintage
    vintage_options[0] = { value: 0, label: "N/A" };
    for (let i = nowDate.getFullYear() + 1; i >= 1900; i--) {
        vintage_options[nowDate.getFullYear() + 2 - i] = { value: i, label: i.toString() };
    }
    //bottlesize
    if (bottlesizes?.length > 0) {
        bottlesizes.map((data, index) => {
            bottlesize_options[index] = { value: data._id, label: data.bottle_size + data.unit }
        })
    }
    //allergy
    if (allergies?.length > 0) {
        allergies.map((data, index) => {
            allergy_options[index] = { value: data._id, label: data[`${globalState.language}`] }
        })
    }
    //allergy
    if (closureTypes?.length > 0) {
        closureTypes.map((data, index) => {
            closureType_options[index] = { value: data._id, label: data[`${globalState.language}`] }
        })
    }

    const handleInputChange = (key, value) => {
        filterData[`${key}`] = value;
        setFilterData({ ...filterData });
    };

    const clearFilter = () => {
        setFilterData({
            wine_color: null,
            wine_type: null,
            grape: null,
            taste: null,
            producer: null,
            spirit_sub_type: null,
            spirit_type: null,
            beer_type: null,
            country: null,
            region: null,
            sub_region: null,
            aroma: null,
            food: null,

            vintage: null,
            allergy: null,
            closure_type: null,
            bottle_size: null,
            alc_vol: [0, 100],
            wine_acid: [0, 100],
            residual_sugar: [0, 100],
        });
    }

    const applyFilter = () => {
        clearFilter();
        props.addFilterArray(filterData);
        close();
    }

    const openModal = () => {
        setModalShow(true);
    }

    const closeModal = () => {
        swal.fire({
            title: t("swal_are_you_sure"),
            text: t("swal_leave_page"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t("swal_leave")
        })
            .then(result => {
                if (result.isConfirmed) {
                    close();
                }
            });
    }

    function close() {
        clearFilter();
        setModalShow(false);
    }

    return (
        <React.Fragment>
            <Button onClick={() => openModal()} outline={true} className="bg-sitebg-50" >
                <HiOutlineFilter className="mr-2 h-6 w-6 text-sitebg-50" />
                {t("add_filter")}
            </Button>
            <Modal
                show={modalShow}
                size="xl"
                popup={true}
                onClose={() => closeModal()}
            >
                <Modal.Header>
                    {t("filters")}
                </Modal.Header>
                <hr />
                <Modal.Body className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
                    <Tabs.Group
                        className="pt-4"
                        aria-label="Tabs with underline"
                        style="underline"
                    >
                        <Tabs.Item
                            active={true}
                            title="Properties"
                            className="w-2/5"
                        >
                            <Accordion alwaysOpen={true} flush={true}>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        {t("wine")}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.wine_color}
                                                    onChange={(value) => handleInputChange("wine_color", value)}
                                                    options={winecolor_options}
                                                    placeholder="Wine Color"
                                                    isMultiple
                                                    isClearable
                                                />

                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.wine_type}
                                                    onChange={value => handleInputChange("wine_type", value)}
                                                    options={winetype_options}
                                                    placeholder="Wine Type"
                                                    isMultiple
                                                    isClearable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.taste}
                                                    onChange={value => handleInputChange("taste", value)}
                                                    options={taste_options}
                                                    placeholder="Wine Taste"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.grape}
                                                    onChange={value => handleInputChange("grape", value)}
                                                    options={grape_options}
                                                    placeholder="Grape Variaties"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        {t("spirit")}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.spirit_type}
                                                    onChange={value => handleInputChange("spirit_type", value)}
                                                    options={spirittype_options}
                                                    placeholder={t("spirit_type")}
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.spirit_sub_type}
                                                    onChange={value => handleInputChange("spirit_sub_type", value)}
                                                    options={spiritsubtype_options}
                                                    placeholder="Spirit-SubType"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        {t("beer")}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.beer_type}
                                                    onChange={value => handleInputChange("beer_type", value)}
                                                    options={beertype_options}
                                                    placeholder={t("beer_type")}
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        {t("origin")}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.producer}
                                                    onChange={value => handleInputChange("producer", value)}
                                                    options={producer_options}
                                                    placeholder="Producer"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.country}
                                                    onChange={value => handleInputChange("country", value)}
                                                    options={country_options}
                                                    placeholder="Country"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.region}
                                                    onChange={value => handleInputChange("region", value)}
                                                    options={region_options}
                                                    placeholder="Region"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.sub_region}
                                                    onChange={value => handleInputChange("sub_region", value)}
                                                    options={subregion_options}
                                                    placeholder="Subregion"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        {t("sensorics")}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.aroma}
                                                    onChange={value => handleInputChange("aroma", value)}
                                                    options={aroma_options}
                                                    placeholder="Aroma"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.food}
                                                    onChange={value => handleInputChange("food", value)}
                                                    options={food_options}
                                                    placeholder="Food-Pairing"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </Tabs.Item>
                        <Tabs.Item
                            className="w-2/5"
                            title="Information"
                        >
                            <Accordion alwaysOpen={true} flush={true}>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        {t("version_info")}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.vintage}
                                                    onChange={(value) => handleInputChange("vintage", value)}
                                                    options={vintage_options}
                                                    placeholder="Vintage"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.bottle_size}
                                                    onChange={(value) => handleInputChange("bottle_size", value)}
                                                    options={bottlesize_options}
                                                    placeholder={t("bottle_size")}
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.closure_type}
                                                    onChange={(value) => handleInputChange("closure_type", value)}
                                                    options={closureType_options}
                                                    placeholder="Closure Type"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                        <div className="py-2">
                                            <SelectCustomStyle>
                                                <Select
                                                    value={filterData.allergy}
                                                    onChange={(value) => handleInputChange("allergy", value)}
                                                    options={allergy_options}
                                                    placeholder="Allergies"
                                                    isMultiple
                                                    isClearable
                                                    isSearchable
                                                />
                                            </SelectCustomStyle>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                                <Accordion.Panel>
                                    <Accordion.Title>
                                        {t("analyse")}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <div className="py-4">
                                            <div className="m-2 ml-2 text-sm block">
                                                {t("alcohol_vol")}
                                            </div>
                                            <MultiRange type="alc_vol" value={filterData.alc_vol} setValue={handleInputChange} />
                                        </div>
                                        <div className="py-4">
                                            <div className="m-2 ml-2 text-sm block">
                                                {t("wine_acid_gl")}
                                            </div>
                                            <MultiRange type="wine_acid" value={filterData.wine_acid} setValue={handleInputChange} />
                                        </div>
                                        <div className="py-4">
                                            <div className="m-2 ml-2 text-sm block">
                                                {t("residual_sugar_gl")}
                                            </div>
                                            <MultiRange type="residual_sugar" value={filterData.residual_sugar} setValue={handleInputChange} />
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </Tabs.Item>
                    </Tabs.Group>
                </Modal.Body>
                <hr />
                <Modal.Footer>
                    <div className="flex flex-wrap items-center gap-4 m-auto">
                        <div>
                            <Button
                                className="bg-gray-100 text-sitetx-200 hover:bg-gray-200"
                                onClick={() => clearFilter()}
                            >
                                <HiOutlineTrash className="mr-2 h-5 w-5" />
                                {t("clear_filter")}
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => applyFilter()}
                            >
                                <HiOutlineFilter className="mr-2 h-5 w-5 text-sitebg-50" />
                                {t("apply_filter")}
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default AddFilter;
