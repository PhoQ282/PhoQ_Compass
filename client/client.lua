local UPDATE_MS = 50
local HEADING_EPS = 0.25
local ITEM_CHECK_MS = 600
local COMPASS_ITEM = 'compass' -- rename if your item uses a different name


local show = false
local lastHeading = -1.0
local lastStreet = ''


local function hasCompass()
    local count = exports.ox_inventory:Search('count', COMPASS_ITEM)
    return (count or 0) > 0
end


CreateThread(function()
    while true do
        local visible = hasCompass()
        if visible ~= show then
            show = visible
            SendNUIMessage({ action = 'visibility', show = show })
        end
        Wait(ITEM_CHECK_MS)
    end
end)


CreateThread(function()
    while true do
        if show then
            local ped = PlayerPedId()
            local coords = GetEntityCoords(ped)
            local heading = GetEntityHeading(ped)
            local streetHash, crossHash = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
            local streetName = GetStreetNameFromHashKey(streetHash) or ''
            local crossName = GetStreetNameFromHashKey(crossHash) or ''
            local fullStreet = streetName
            if crossName ~= '' and crossName ~= streetName then
                fullStreet = (streetName ~= '' and (streetName .. ' & ' .. crossName)) or crossName
            end
            if math.abs(heading - lastHeading) > HEADING_EPS or fullStreet ~= lastStreet then
                lastHeading = heading
                lastStreet = fullStreet
                SendNUIMessage({
                    action = 'update',
                    heading = heading,
                    street = fullStreet
                })
            end
        end
        Wait(UPDATE_MS)
    end
end)
