import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { MessageCircle, Calendar, DollarSign, Package, Heart, Clock } from 'lucide-react';

const MassageDashboard = () => {
  // Two weeks, Sunday–Saturday + Sunday the 16th appended
  const [selectedWeek, setSelectedWeek] = useState(0);

  const weeksData = [
    {
      label: 'Week 1 (Feb 2 – Feb 8)',
      dates: [
        { date: 'Sunday Feb 2', note: 'Date is passed' },
        { date: 'Monday Feb 3', note: 'Date is passed' },
        { date: 'Tuesday Feb 4', timeRange: '', fullyBooked: false, note: 'Date is passed' },
        { date: 'Wednesday Feb 5', timeRange: '', fullyBooked: false, note: 'Date is passed' },
        { date: 'Thursday Feb 6', fullyBooked: false, note: 'Date is passed' },
        { date: 'Friday Feb 7', fullyBooked: true },
        { date: 'Saturday Feb 8', timeRange: '5pm – 10pm', fullyBooked: false }
      ]
    },
    {
      label: 'Week 2 (Feb 9 – Feb 15)',
      dates: [
        { date: 'Sunday Feb 9', fullyBooked: true },
        { date: 'Monday Feb 10', fullyBooked: true },
        { date: 'Tuesday Feb 11', timeRange: '4pm – 7pm', fullyBooked: false },
        { date: 'Wednesday Feb 12', timeRange: '5pm – 10pm', fullyBooked: false },
        { date: 'Thursday Feb 13', timeRange: '2pm – 6pm', fullyBooked: false },
        { date: 'Friday Feb 14', fullyBooked: true },
        { date: 'Saturday Feb 15', timeRange: '3pm – 10pm', fullyBooked: false },
        { date: 'Sunday Feb 16', timeRange: '3pm – 10pm', fullyBooked: false }
      ]
    }
  ];

  // “Text to Book” link
  const generateBookingMessage = (
    msg = 'Hello! I’d like to schedule a massage session.'
  ) => `sms:+16579448295?body=${encodeURIComponent(msg)}`;

  // Base sessions
  const baseSessions = [
    { duration: '60-min Session', price: 100 },
    { duration: '90-min Session', price: 150 },
    { duration: '120-min Session', price: 200 }
  ];

  // Enhancements
  const enhancements = [
    { name: 'Hot Stone Therapy', price: 20 },
    { name: 'Theragun Treatment', price: 10 },
    { name: 'Warm Bamboo Sticks', price: 30 },
    {
      name: 'Dynamic Stretching',
      price: 25,
      note: '(adds 15 minutes)'
    }
  ];

  // Packages with updated perks
  const packageData = [
    {
      sessionLength: '60-Minute',
      fourPackPrice: 360, // $90 each
      perk: 'Includes aromatherapy'
    },
    {
      sessionLength: '90-Minute',
      fourPackPrice: 540, // $135 each
      perk: 'Includes aromatherapy and your choice of either hot stones or Theragun'
    },
    {
      sessionLength: '2-Hour',
      fourPackPrice: 720, // $180 each
      perk: 'Includes aromatherapy, plus your choice of hot stones, Theragun, or warm bamboo sticks'
    }
  ];

  // February Couples Massage Special
  const couplesSpecial = {
    title: "February Couples Massage: \"The Valentine's Retreat\"",
    note: '(Available all February)',
    options: [
      {
        length: '60-Minute Option',
        price: '$270/couple',
        included: [
          'Side-by-Side Massages',
          'Romantic Ambiance Setup (diffuser, candles, rose petals — client provides space)',
          'Warm Towel Treatment'
        ],
        addOns: [
          { title: 'Extra 30 Minutes (focused work)', price: '+$90' },
          { title: 'Hand & Foot Scrub (per couple)', price: '+$50' }
        ]
      },
      {
        length: '90-Minute Option',
        price: '$390/couple',
        included: [
          'Side-by-Side Massages',
          'Romantic Ambiance Setup (diffuser, candles, rose petals — client provides space)',
          'Warm Towel Treatment'
        ],
        addOns: [
          { title: 'Extra 30 Minutes (focused work)', price: '+$90' },
          { title: 'Hand & Foot Scrub (per couple)', price: '+$50' }
        ]
      }
    ]
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Logo & Header */}
      <div className="text-center mb-4">
        <img
          src="/logo.png"
          alt="Massage by Ivan Logo"
          className="mx-auto w-24 mb-2"
        />
        <h1 className="text-2xl font-bold" style={{ color: '#36454f' }}>
          MASSAGE BY IVAN
        </h1>
      </div>

      {/* Quick Book Button */}
      <a
        href={generateBookingMessage()}
        className="block w-full bg-[#387c7e] text-white text-center py-3 rounded-lg shadow-md hover:opacity-90 transition-colors"
      >
        <MessageCircle className="inline-block mr-2 w-5 h-5" />
        Text to Book
      </a>

      {/* Availability w/ Toggle */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle
            style={{ color: '#36454f' }}
            className="flex items-center gap-2"
          >
            <Calendar className="text-[#387c7e] w-5 h-5" />
            Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4 mb-4">
            {weeksData.map((week, i) => (
              <button
                key={i}
                onClick={() => setSelectedWeek(i)}
                className={
                  selectedWeek === i
                    ? 'bg-[#387c7e] text-white px-4 py-2 rounded'
                    : 'bg-gray-100 text-gray-700 px-4 py-2 rounded'
                }
              >
                {week.label}
              </button>
            ))}
          </div>

          {/* Date & Time Listing */}
          <div className="space-y-4">
            {weeksData[selectedWeek].dates.map((day, idx) => (
              <div
                key={idx}
                className="border-b pb-2 last:border-0"
                style={{ borderColor: '#e5e7eb' }}
              >
                <h3
                  style={{ color: '#36454f' }}
                  className="font-semibold text-base mb-1"
                >
                  {day.date}
                </h3>
                {day.fullyBooked ? (
                  <span className="text-sm text-gray-600 italic">
                    FULLY BOOKED — text to join waitlist
                  </span>
                ) : day.timeRange ? (
                  <span className="text-sm text-green-800 bg-green-100 inline-block px-2 py-1 rounded">
                    {day.timeRange} open
                  </span>
                ) : (
                  <span className="text-sm text-gray-600 italic">
                    {day.note || 'No schedule details provided'}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 text-sm text-gray-600 border-t pt-4">
            If you need different dates or times, please text for extended availability
            or waitlist.
          </div>
        </CardContent>
      </Card>

      {/* Pricing (Base Sessions & Enhancements) */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle
            style={{ color: '#36454f' }}
            className="flex items-center gap-2"
          >
            <DollarSign className="text-[#387c7e] w-5 h-5" />
            Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Base Sessions */}
            <div>
              <h3 className="font-semibold mb-3" style={{ color: '#36454f' }}>
                Base Sessions
              </h3>
              <div className="space-y-2">
                {baseSessions.map((session, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b pb-2 last:border-0"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    <span style={{ color: '#36454f' }}>{session.duration}</span>
                    <span style={{ color: '#387c7e' }} className="font-semibold">
                      ${session.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhancements */}
            <div>
              <h3 className="font-semibold mb-3" style={{ color: '#36454f' }}>
                Enhance Your Session
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {enhancements.map((item, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-3 bg-white"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    <div className="flex justify-between items-center">
                      <span style={{ color: '#36454f' }}>{item.name}</span>
                      <span style={{ color: '#387c7e' }}>+${item.price}</span>
                    </div>
                    {item.note && (
                      <p className="text-xs text-gray-500 mt-1">{item.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4-Session Packages (Perks updated) */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle
            style={{ color: '#36454f' }}
            className="flex items-center gap-2"
          >
            <Package className="text-[#387c7e] w-5 h-5" />
            Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-600">
                <tr>
                  <th className="pb-2 text-left font-medium">Package</th>
                  <th className="pb-2 text-left font-medium">4-Session Package</th>
                  <th className="pb-2 text-left font-medium">Perks</th>
                </tr>
              </thead>
              <tbody>
                {packageData.map((pkg, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-0"
                    style={{ borderColor: '#e5e7eb' }}
                  >
                    <td className="py-2">{pkg.sessionLength}</td>
                    <td className="py-2">
                      ${pkg.fourPackPrice} ({`$${pkg.fourPackPrice / 4}/session`})
                    </td>
                    <td className="py-2 text-gray-700">{pkg.perk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <a
              href={generateBookingMessage(`Hello! I'd like to inquire about your massage packages.`)}
              className="block w-full bg-[#387c7e] text-white text-center py-3 rounded-lg shadow-md hover:opacity-90 transition-colors"
            >
              <MessageCircle className="inline-block mr-2 w-5 h-5" />
              Inquire About Packages
            </a>
          </div>
        </CardContent>
      </Card>

      {/* February Couples Special */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle
            style={{ color: '#36454f' }}
            className="flex items-center gap-2"
          >
            <Heart className="text-[#387c7e] w-5 h-5" />
            {couplesSpecial.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">{couplesSpecial.note}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-600">
                <tr>
                  <th className="pb-2 text-left font-medium">Feature</th>
                  {couplesSpecial.options.map((opt, i) => (
                    <th key={i} className="pb-2 font-medium text-left">
                      {opt.length}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price row */}
                <tr className="border-b" style={{ borderColor: '#e5e7eb' }}>
                  <td className="py-2 font-semibold text-gray-700">Price</td>
                  {couplesSpecial.options.map((opt, i) => (
                    <td key={i} className="py-2">
                      {opt.price}
                    </td>
                  ))}
                </tr>

                {/* Included Row */}
                <tr className="border-b" style={{ borderColor: '#e5e7eb' }}>
                  <td className="py-2 font-semibold text-gray-700">Included</td>
                  {couplesSpecial.options.map((opt, i) => (
                    <td key={i} className="py-2">
                      {opt.included.map((inc, idx) => (
                        <p key={idx} className="mb-1">
                          {inc}
                        </p>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Upsell Add-Ons Row */}
                <tr>
                  <td className="py-2 font-semibold text-gray-700">
                    Upsell Add-Ons
                  </td>
                  {couplesSpecial.options.map((opt, i) => (
                    <td key={i} className="py-2">
                      {opt.addOns.map((addon, idx) => (
                        <p key={idx} className="mb-1">
                          {addon.title} {addon.price}
                        </p>
                      ))}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Policies */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle
            style={{ color: '#36454f' }}
            className="flex items-center gap-2"
          >
            <Clock className="text-[#387c7e] w-5 h-5" />
            Policies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2" style={{ color: '#36454f' }}>
            <li>A 24-hour cancellation notice is required.</li>
            <li>No-shows are charged 50% of the service price.</li>
            <li>For fully booked days, please inquire if you'd like to be added to the cancellation waitlist.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MassageDashboard;
